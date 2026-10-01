import type { NextConfig } from "next";

const permanent = (source: string, destination: string) => ({
  source,
  destination,
  permanent: true,
});

const nextConfig: NextConfig = {
  reactCompiler: true,
  redirects() {
    return [
      permanent("/digital-marketing", "/services/digital-marketing"),
      permanent("/sitemap_index.xml", "/sitemap.xml"),
      permanent(
        "/:type(post|page|category|author|project|elementskit_content)-sitemap.xml",
        "/sitemap.xml",
      ),
      permanent("/feed", "/feed.xml"),
      permanent("/comments/feed", "/feed.xml"),
      permanent("/:slug/feed", "/feed.xml"),
      permanent("/category/:path*", "/blog"),
      permanent("/tag/:path*", "/blog"),
      permanent("/author/:path*", "/our-team"),
      permanent("/page/:page(\\d+)", "/blog/page/:page"),
      permanent("/blog/page/1", "/blog"),
      permanent("/our-projects", "/case-studies"),
      permanent("/testimonials", "/case-studies"),
      permanent("/about-fawad", "/our-team"),
      permanent("/team-details-2", "/our-team"),
    ];
  },
};

export default nextConfig;
