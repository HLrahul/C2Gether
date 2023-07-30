import ThemeMenuButton from "@/components/ThemeMenuButton";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-between pb-5 pt-[13vh]">
      <ThemeMenuButton className="fixed right-[5vw] top-5 flex-1 md:right-5" />

      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
