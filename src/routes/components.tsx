import { createFileRoute } from "@tanstack/react-router";
import {
	AlertCircle,
	ChevronRight,
	Home,
	Mail,
	Plus,
	Search,
	Settings,
	Terminal,
	Trash2,
	User,
} from "lucide-react";
import { useState } from "react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "#/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "#/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "#/components/ui/breadcrumb";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Checkbox } from "#/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "#/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Progress } from "#/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "#/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import { Separator } from "#/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "#/components/ui/sheet";
import { Switch } from "#/components/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { Textarea } from "#/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "#/components/ui/tooltip";

export const Route = createFileRoute("/components")({
	component: ComponentsPage,
});

function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section className="space-y-4">
			<h2 className="text-xl font-semibold tracking-tight">{title}</h2>
			<div className="rounded-lg border border-border bg-card p-6">
				{children}
			</div>
		</section>
	);
}

function ComponentsPage() {
	const [progress, setProgress] = useState(60);
	const [switchChecked, setSwitchChecked] = useState(true);

	return (
		<TooltipProvider>
			<main className="mx-auto max-w-4xl px-4 py-12">
				<div className="mb-12 space-y-2">
					<h1 className="text-3xl font-bold tracking-tight">Components</h1>
					<p className="text-muted-foreground">
						All shadcn components with the Pencil Neutral/Dark theme.
					</p>
				</div>

				<div className="space-y-10">
					{/* Buttons */}
					<Section title="Button">
						<div className="flex flex-wrap gap-3">
							<Button>Default</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="destructive">Destructive</Button>
							<Button variant="outline">Outline</Button>
							<Button variant="ghost">Ghost</Button>
							<Button variant="link">Link</Button>
						</div>
						<div className="mt-4 flex flex-wrap gap-3">
							<Button size="sm">Small</Button>
							<Button size="default">Default</Button>
							<Button size="lg">Large</Button>
							<Button size="icon">
								<Plus />
							</Button>
						</div>
					</Section>

					{/* Input */}
					<Section title="Input">
						<div className="grid max-w-sm gap-4">
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input id="email" type="email" placeholder="user@example.com" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="disabled">Disabled</Label>
								<Input id="disabled" placeholder="Disabled" disabled />
							</div>
						</div>
					</Section>

					{/* Textarea */}
					<Section title="Textarea">
						<div className="max-w-sm space-y-2">
							<Label htmlFor="message">Message</Label>
							<Textarea id="message" placeholder="Type your message here..." />
						</div>
					</Section>

					{/* Select */}
					<Section title="Select">
						<div className="max-w-sm">
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="Select a framework" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="react">React</SelectItem>
									<SelectItem value="vue">Vue</SelectItem>
									<SelectItem value="svelte">Svelte</SelectItem>
									<SelectItem value="solid">Solid</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</Section>

					{/* Checkbox */}
					<Section title="Checkbox">
						<div className="space-y-3">
							<div className="flex items-center gap-2">
								<Checkbox id="terms" />
								<Label htmlFor="terms">Accept terms and conditions</Label>
							</div>
							<div className="flex items-center gap-2">
								<Checkbox id="newsletter" defaultChecked />
								<Label htmlFor="newsletter">Subscribe to newsletter</Label>
							</div>
						</div>
					</Section>

					{/* Radio Group */}
					<Section title="Radio Group">
						<RadioGroup defaultValue="comfortable">
							<div className="flex items-center gap-2">
								<RadioGroupItem value="default" id="r1" />
								<Label htmlFor="r1">Default</Label>
							</div>
							<div className="flex items-center gap-2">
								<RadioGroupItem value="comfortable" id="r2" />
								<Label htmlFor="r2">Comfortable</Label>
							</div>
							<div className="flex items-center gap-2">
								<RadioGroupItem value="compact" id="r3" />
								<Label htmlFor="r3">Compact</Label>
							</div>
						</RadioGroup>
					</Section>

					{/* Switch */}
					<Section title="Switch">
						<div className="flex items-center gap-2">
							<Switch
								id="airplane"
								checked={switchChecked}
								onCheckedChange={setSwitchChecked}
							/>
							<Label htmlFor="airplane">Airplane Mode</Label>
						</div>
					</Section>

					{/* Card */}
					<Section title="Card">
						<Card className="max-w-sm">
							<CardHeader>
								<CardTitle>Card Title</CardTitle>
								<CardDescription>
									Card description with supporting text.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Card content goes here. This is a sample card with header,
									content, and footer sections.
								</p>
							</CardContent>
							<CardFooter className="gap-2">
								<Button variant="outline" size="sm">
									Cancel
								</Button>
								<Button size="sm">Save</Button>
							</CardFooter>
						</Card>
					</Section>

					{/* Badge */}
					<Section title="Badge">
						<div className="flex flex-wrap gap-2">
							<Badge>Default</Badge>
							<Badge variant="secondary">Secondary</Badge>
							<Badge variant="destructive">Destructive</Badge>
							<Badge variant="outline">Outline</Badge>
						</div>
					</Section>

					{/* Avatar */}
					<Section title="Avatar">
						<div className="flex gap-4">
							<Avatar>
								<AvatarImage
									src="https://github.com/shadcn.png"
									alt="@shadcn"
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<Avatar>
								<AvatarFallback>VN</AvatarFallback>
							</Avatar>
							<Avatar>
								<AvatarFallback>AB</AvatarFallback>
							</Avatar>
						</div>
					</Section>

					{/* Alert */}
					<Section title="Alert">
						<div className="space-y-4">
							<Alert>
								<Terminal className="size-4" />
								<AlertTitle>Heads up!</AlertTitle>
								<AlertDescription>
									You can add components to your app using the CLI.
								</AlertDescription>
							</Alert>
							<Alert variant="destructive">
								<AlertCircle className="size-4" />
								<AlertTitle>Error</AlertTitle>
								<AlertDescription>
									Something went wrong. Please try again.
								</AlertDescription>
							</Alert>
						</div>
					</Section>

					{/* Progress */}
					<Section title="Progress">
						<div className="max-w-sm space-y-4">
							<Progress value={progress} />
							<div className="flex gap-2">
								<Button
									size="sm"
									variant="outline"
									onClick={() => setProgress((p) => Math.max(0, p - 10))}
								>
									-10
								</Button>
								<Button
									size="sm"
									variant="outline"
									onClick={() => setProgress((p) => Math.min(100, p + 10))}
								>
									+10
								</Button>
							</div>
						</div>
					</Section>

					{/* Separator */}
					<Section title="Separator">
						<div className="space-y-4">
							<div>
								<h4 className="text-sm font-medium">Section Title</h4>
								<p className="text-sm text-muted-foreground">
									Some description text.
								</p>
							</div>
							<Separator />
							<div>
								<h4 className="text-sm font-medium">Another Section</h4>
								<p className="text-sm text-muted-foreground">
									More description text.
								</p>
							</div>
						</div>
					</Section>

					{/* Tabs */}
					<Section title="Tabs">
						<Tabs defaultValue="account" className="max-w-md">
							<TabsList>
								<TabsTrigger value="account">Account</TabsTrigger>
								<TabsTrigger value="password">Password</TabsTrigger>
							</TabsList>
							<TabsContent value="account" className="space-y-2">
								<p className="text-sm text-muted-foreground">
									Make changes to your account here.
								</p>
								<Input placeholder="Name" />
							</TabsContent>
							<TabsContent value="password" className="space-y-2">
								<p className="text-sm text-muted-foreground">
									Change your password here.
								</p>
								<Input type="password" placeholder="New password" />
							</TabsContent>
						</Tabs>
					</Section>

					{/* Accordion */}
					<Section title="Accordion">
						<Accordion type="single" collapsible className="max-w-md">
							<AccordionItem value="item-1">
								<AccordionTrigger>Is it accessible?</AccordionTrigger>
								<AccordionContent>
									Yes. It adheres to the WAI-ARIA design pattern.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger>Is it styled?</AccordionTrigger>
								<AccordionContent>
									Yes. It comes with default styles matching your theme.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>Is it animated?</AccordionTrigger>
								<AccordionContent>
									Yes. It uses CSS animations for smooth transitions.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</Section>

					{/* Dialog */}
					<Section title="Dialog">
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="outline">Open Dialog</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Are you sure?</DialogTitle>
									<DialogDescription>
										This action cannot be undone. This will permanently delete
										your account.
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<Button variant="outline">Cancel</Button>
									<Button>Continue</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</Section>

					{/* Sheet */}
					<Section title="Sheet">
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="outline">Open Sheet</Button>
							</SheetTrigger>
							<SheetContent>
								<SheetHeader>
									<SheetTitle>Edit Profile</SheetTitle>
									<SheetDescription>
										Make changes to your profile here.
									</SheetDescription>
								</SheetHeader>
								<div className="space-y-4 py-4">
									<div className="space-y-2">
										<Label htmlFor="sheet-name">Name</Label>
										<Input id="sheet-name" placeholder="Your name" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="sheet-email">Email</Label>
										<Input id="sheet-email" placeholder="Your email" />
									</div>
								</div>
							</SheetContent>
						</Sheet>
					</Section>

					{/* Dropdown Menu */}
					<Section title="Dropdown Menu">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline">Open Menu</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<User className="mr-2 size-4" />
									Profile
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Settings className="mr-2 size-4" />
									Settings
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Mail className="mr-2 size-4" />
									Messages
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="text-destructive">
									<Trash2 className="mr-2 size-4" />
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</Section>

					{/* Tooltip */}
					<Section title="Tooltip">
						<div className="flex gap-4">
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant="outline" size="icon">
										<Plus />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Add new item</p>
								</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant="outline" size="icon">
										<Search />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Search</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</Section>

					{/* Table */}
					<Section title="Table">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Role</TableHead>
									<TableHead className="text-right">Amount</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell className="font-medium">Alice</TableCell>
									<TableCell>
										<Badge variant="secondary">Active</Badge>
									</TableCell>
									<TableCell>Admin</TableCell>
									<TableCell className="text-right">$2,500.00</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">Bob</TableCell>
									<TableCell>
										<Badge variant="outline">Inactive</Badge>
									</TableCell>
									<TableCell>Editor</TableCell>
									<TableCell className="text-right">$1,200.00</TableCell>
								</TableRow>
								<TableRow>
									<TableCell className="font-medium">Charlie</TableCell>
									<TableCell>
										<Badge variant="secondary">Active</Badge>
									</TableCell>
									<TableCell>Viewer</TableCell>
									<TableCell className="text-right">$800.00</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</Section>

					{/* Breadcrumb */}
					<Section title="Breadcrumb">
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink href="/">
										<Home className="size-4" />
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator>
									<ChevronRight className="size-4" />
								</BreadcrumbSeparator>
								<BreadcrumbItem>
									<BreadcrumbLink href="/components">Components</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator>
									<ChevronRight className="size-4" />
								</BreadcrumbSeparator>
								<BreadcrumbItem>
									<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</Section>
				</div>
			</main>
		</TooltipProvider>
	);
}
