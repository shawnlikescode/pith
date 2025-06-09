import { cssInterop } from "nativewind";
import {
	type LucideIcon,
	Sun,
	MoonStar,
	LoaderCircle,
	ChevronRight,
	Book,
	BookOpen,
	MessageSquare,
	Calendar,
	CircleHelp,
	Quote,
	Lightbulb,
	User,
	Hash,
	Plus,
	X,
	LocateFixed,
	Home,
	Search,
	Filter,
	AlertTriangle,
} from "lucide-react-native";

/**
 * Configures className prop support for Lucide icons
 */
function iconWithClassName(icon: LucideIcon): void {
	cssInterop(icon, {
		className: {
			target: "style",
			nativeStyleToProp: {
				color: true,
				opacity: true,
			},
		},
	});
}

iconWithClassName(Sun);
iconWithClassName(MoonStar);
iconWithClassName(LoaderCircle);
iconWithClassName(ChevronRight);
iconWithClassName(Book);
iconWithClassName(BookOpen);
iconWithClassName(MessageSquare);
iconWithClassName(Calendar);
iconWithClassName(CircleHelp);
iconWithClassName(Quote);
iconWithClassName(Lightbulb);
iconWithClassName(User);
iconWithClassName(Hash);
iconWithClassName(Plus);
iconWithClassName(X);
iconWithClassName(LocateFixed);
iconWithClassName(Home);
iconWithClassName(Search);
iconWithClassName(Filter);
iconWithClassName(AlertTriangle);

export {
	type LucideIcon,
	Sun,
	MoonStar,
	LoaderCircle,
	ChevronRight,
	Book,
	BookOpen,
	MessageSquare,
	Calendar,
	CircleHelp,
	Quote,
	Lightbulb,
	User,
	Hash,
	Plus,
	X,
	LocateFixed,
	Home,
	Search,
	Filter,
	AlertTriangle,
};
