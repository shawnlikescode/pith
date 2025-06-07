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
} from "lucide-react-native";

function iconWithClassName(icon: LucideIcon) {
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
};
