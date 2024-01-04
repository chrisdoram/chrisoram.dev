import { Icons } from "@/components/icons";

const madeWithLinks = [
  {
    url: "https://github.com/chrisdoram/chrisoram.dev",
    label: "GitHub",
    icon: Icons.gitHub,
  },
  {
    url: "https://contentlayer.dev",
    label: "Contentlayer",
    icon: Icons.contentlayer,
  },
  { url: "https://nextjs.org", label: "Next.js", icon: Icons.next },
];

export const Footer = () => {
  return (
    <footer className="py-12">
      <section className="flex flex-col items-center gap-5">
        <span className="flex items-center text-[0.9rem] leading-[1.2] px-2 py-0">
          made with ❤️ by Chris Oram
        </span>
        <nav className="flex gap-1 mx-4 my-0">
          {madeWithLinks.map((link) => (
            <a
              href={link.url}
              title={link.label}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
              className="flex items-center text-[0.9rem] leading-[1.2] px-2 py-0 hover:underline"
            >
              <span className="flex items-center text-[0.9rem] leading-[1.2] px-2 py-0">
                {link.label}
              </span>
              <link.icon className="h-4 w-4" />
            </a>
          ))}
        </nav>
      </section>
    </footer>
  );
};
