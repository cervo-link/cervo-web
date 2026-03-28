import { createFileRoute } from '@tanstack/react-router'
import { formatDistanceToNowStrict } from 'date-fns'
import { Link2, Search, SearchX, X } from 'lucide-react'
import { parseAsString, useQueryState } from 'nuqs'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useGetBookmarks, usePostBookmarks } from '#/api/bookmarks/bookmarks'
import type {
	GetBookmarks200Item,
	GetMembersMe200Member,
} from '#/api/cervoAPI.schemas'
import { useGetMembersMe } from '#/api/members/members'
import { useGetWorkspacesMe } from '#/api/workspaces/workspaces'
import { LinkDetailView } from '#/components/LinkDetailView'
import { LinkListItem } from '#/components/LinkListItem'
import { Badge } from '#/components/ui/badge'
import { Input } from '#/components/ui/input'
import { Separator } from '#/components/ui/separator'

export const Route = createFileRoute('/_dashboard/links')({
	head: () => ({
		meta: [
			{ title: 'Links — Cervo' },
			{
				name: 'description',
				content: 'Your bookmarks, organized',
			},
		],
	}),
	component: LinksPage,
})

function timeAgo(dateStr: string): string {
	return formatDistanceToNowStrict(new Date(dateStr), { addSuffix: true })
}

const RECENT_SEARCHES = [
	'recruiting mistakes',
	'react server components',
	'design tokens',
]

function toDetailLink(
	bookmark: GetBookmarks200Item,
	member: GetMembersMe200Member | null
) {
	return {
		id: bookmark.id,
		title: bookmark.title ?? bookmark.url,
		description: bookmark.matchedBecause ?? bookmark.description ?? '',
		url: bookmark.url,
		tag: bookmark.tags?.[0] ?? 'bookmark',
		timeAgo: timeAgo(bookmark.createdAt),
		savedBy: member?.name ?? member?.username ?? member?.email ?? 'Unknown',
		savedAt: new Date(bookmark.createdAt).toLocaleDateString('en-CA'),
		source: bookmark.source ?? 'web',
	}
}

function LinksPage() {
	const [searchValue, setSearchValue] = useQueryState(
		'q',
		parseAsString.withDefault('')
	)
	const [linkId, setLinkId] = useQueryState('id', parseAsString)
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [saveUrl, setSaveUrl] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)
	const saveInputRef = useRef<HTMLInputElement>(null)
	const listRef = useRef<HTMLDivElement>(null)

	const { data: membersData } = useGetMembersMe()
	const { data: workspacesData } = useGetWorkspacesMe()
	const member =
		membersData?.status === 200 ? (membersData.data.member ?? null) : null
	const workspace =
		workspacesData?.status === 200
			? (workspacesData.data.workspaces[0] ?? null)
			: null

	const isSearching = searchValue.trim().length > 0

	const { data: bookmarksRaw, isFetching } = useGetBookmarks(
		{
			workspaceId: workspace?.id ?? '',
			memberId: member?.id ?? '',
			text: searchValue.trim(),
			limit: 20,
		},
		{
			query: {
				enabled: isSearching && !!member && !!workspace,
			},
		}
	)

	const bookmarks = bookmarksRaw?.status === 200 ? bookmarksRaw.data : []

	const { mutate: saveBookmark, isPending: isSaving } = usePostBookmarks()

	function handleSave() {
		const url = saveUrl.trim()
		if (!url || !member || !workspace) return
		saveBookmark(
			{ data: { url, memberId: member.id, workspaceId: workspace.id } },
			{
				onSuccess: () => {
					setSaveUrl('')
					saveInputRef.current?.focus()
					toast.success('Link saved!')
				},
				onError: () => {
					toast.error('Failed to save link. Please try again.')
				},
			}
		)
	}

	function handleClear() {
		void setSearchValue(null)
		inputRef.current?.focus()
	}

	const handleItemClick = useCallback(
		(id: string) => {
			void setLinkId(id)
		},
		[setLinkId]
	)

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (bookmarks.length === 0) return

			const hasOpenPopover = document.querySelector(
				"[data-state='open'][data-radix-popper-content-wrapper], [data-state='open'][role='menu']"
			)
			if (hasOpenPopover) return

			if (e.key === 'ArrowDown') {
				e.preventDefault()
				setSelectedIndex(prev => (prev >= bookmarks.length - 1 ? 0 : prev + 1))
				return
			}

			if (e.key === 'ArrowUp') {
				e.preventDefault()
				setSelectedIndex(prev => (prev <= 0 ? bookmarks.length - 1 : prev - 1))
				return
			}

			if (e.key === 'Enter') {
				const active = document.activeElement
				const isOnInput = active === inputRef.current
				const isOnInteractive =
					active instanceof HTMLButtonElement ||
					active instanceof HTMLAnchorElement
				const isOnListItem = active?.closest('[data-link-list-item]')

				if (isOnInput) return
				if (isOnInteractive && !isOnListItem) return

				e.preventDefault()
				const bookmark = bookmarks[selectedIndex]
				if (bookmark) handleItemClick(bookmark.id)
			}
		},
		[selectedIndex, handleItemClick, bookmarks]
	)

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [handleKeyDown])

	const selectedBookmark = linkId
		? bookmarks.find(b => b.id === linkId)
		: undefined

	if (selectedBookmark) {
		return (
			<LinkDetailView
				link={toDetailLink(selectedBookmark, member)}
				onBack={() => void setLinkId(null)}
			/>
		)
	}

	const headerText = isSearching
		? isFetching
			? 'Searching...'
			: `${bookmarks.length} results found`
		: 'Recently added'

	return (
		<div className="flex h-full flex-col gap-8 p-8 md:px-10">
			<div className="flex max-w-7xl flex-col gap-8">
				<h1 className="font-heading text-4xl font-bold tracking-tight text-foreground">
					Links
				</h1>

				<div className="flex flex-col gap-4">
					<div className="flex gap-2">
						<div className="group/save relative flex-1">
							<Link2 className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within/save:text-primary" />
							<Input
								ref={saveInputRef}
								value={saveUrl}
								onChange={e => setSaveUrl(e.target.value)}
								onKeyDown={e => {
									if (e.key === 'Enter') handleSave()
								}}
								placeholder="Paste a URL to save..."
								className="h-11 border-sidebar-border bg-[#0A0A0A] pl-10 font-mono text-[13px] font-medium text-foreground transition-colors placeholder:text-muted-foreground hover:border-primary focus-visible:border-primary focus-visible:ring-0"
							/>
						</div>
						<button
							type="button"
							onClick={handleSave}
							disabled={!saveUrl.trim() || isSaving || !member || !workspace}
							className="h-11 border border-sidebar-border bg-[#141414] px-5 font-mono text-[13px] font-medium text-foreground transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
						>
							{isSaving ? 'Saving...' : 'Save'}
						</button>
					</div>
					<div className="group/search relative">
						<Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within/search:text-primary" />
						<Input
							ref={inputRef}
							value={searchValue}
							onChange={e => setSearchValue(e.target.value)}
							onKeyDown={e => {
								if (e.key !== 'Escape') return
								if (!searchValue) return
								void setSearchValue(null)
							}}
							placeholder="Paste URL or Search..."
							className="h-11 border-sidebar-border bg-[#0A0A0A] pl-10 pr-12 font-mono text-[13px] font-medium text-foreground transition-colors placeholder:text-muted-foreground hover:border-primary focus-visible:border-primary focus-visible:ring-0"
						/>
						{searchValue.length > 0 && (
							<button
								type="button"
								onClick={handleClear}
								className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center text-[#8a8a8a] transition-colors hover:text-foreground"
							>
								<X className="size-4" />
							</button>
						)}
					</div>
					{!isSearching && (
						<div className="flex gap-2">
							{RECENT_SEARCHES.map(search => (
								<Badge key={search} variant="outline" asChild>
									<button
										type="button"
										onClick={() => {
											void setSearchValue(search)
											inputRef.current?.focus()
										}}
										className="cursor-pointer border-sidebar-border font-mono text-[11px] font-medium text-muted-foreground outline-none hover:text-foreground focus-visible:border-primary focus-visible:ring-0!"
									>
										{search}
									</button>
								</Badge>
							))}
						</div>
					)}
				</div>

				<div className="flex flex-1 flex-col gap-2">
					<span className="font-mono text-[11px] font-medium tracking-[0.5px] text-[#6a6a6a]">
						{headerText}
					</span>

					{isSearching && bookmarks.length > 0 && (
						<div ref={listRef} className="flex flex-col">
							{bookmarks.map((bookmark, index) => (
								<div key={bookmark.id}>
									{index > 0 && <Separator className="bg-[#2f2f2f]" />}
									<LinkListItem
										title={bookmark.title ?? bookmark.url}
										description={
											bookmark.matchedBecause ?? bookmark.description ?? ''
										}
										url={bookmark.url}
										tag={bookmark.tags?.[0] ?? 'bookmark'}
										badge={timeAgo(bookmark.createdAt)}
										isSelected={index === selectedIndex}
										onMouseEnter={() => setSelectedIndex(index)}
										onClick={() => handleItemClick(bookmark.id)}
									/>
								</div>
							))}
						</div>
					)}

					{isSearching && !isFetching && bookmarks.length === 0 && (
						<div className="flex flex-1 flex-col items-center justify-center gap-6 py-24">
							<SearchX className="size-12 text-primary" />
							<div className="flex flex-col items-center gap-2">
								<span className="font-heading text-2xl font-bold text-foreground">
									No Matches Found
								</span>
								<span className="max-w-[400px] text-center font-mono text-[13px] leading-relaxed text-[#8a8a8a]">
									We couldn't find any links matching your search. Try different
									keywords or save a new link.
								</span>
							</div>
						</div>
					)}

					{!isSearching && (
						<div className="flex flex-1 flex-col items-center justify-center gap-6 py-24">
							<Search className="size-12 text-primary" />
							<div className="flex flex-col items-center gap-2">
								<span className="font-heading text-2xl font-bold text-foreground">
									Search your links
								</span>
								<span className="max-w-[400px] text-center font-mono text-[13px] leading-relaxed text-[#8a8a8a]">
									Type anything above to semantically search your saved links.
								</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
