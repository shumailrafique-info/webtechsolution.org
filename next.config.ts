import type { NextConfig } from "next";

const permanent = (source: string, destination: string) => ({
  source,
  destination,
  permanent: true,
});

const moved = (source: string, destination: string) => ({
  source,
  destination,
  statusCode: 301 as const,
});

const nextConfig: NextConfig = {
  reactCompiler: true,
  redirects() {
    return [
      moved("/services/web-develpment", "/services/web-development"),
      moved("/web-develpment", "/services/web-development"),
      moved("/service/web-develpment", "/services/web-development"),
      moved("/services/gmb", "/services/google-business-profile"),
      moved("/gmb", "/services/google-business-profile"),
      moved("/services/pay-per-click-ppc-advertising", "/services/google-ads"),
      moved("/pay-per-click-ppc-advertising", "/services/google-ads"),
      moved("/google-ads", "/services/google-ads"),
      permanent("/digital-marketing", "/services/digital-marketing"),
      permanent("/sitemap_index.xml", "/sitemap.xml"),
      permanent(
        "/:type(post|page|category|author|project|elementskit_content)-sitemap.xml",
        "/sitemap.xml",
      ),
      permanent("/feed", "/feed.xml"),
      permanent("/comments/feed", "/feed.xml"),
      permanent("/:slug/feed", "/feed.xml"),
      permanent("/category/:path*/feed", "/feed.xml"),
      moved("/category/web", "/blog/category/web-development"),
      moved("/category/web/page/:page(\\d+)", "/blog/category/web-development"),
      moved(
        "/category/:slug/page/:page(\\d+)",
        "/blog/category/:slug/page/:page",
      ),
      moved(
        "/category/:parent/:slug/page/:page(\\d+)",
        "/blog/category/:slug/page/:page",
      ),
      moved("/category/:slug", "/blog/category/:slug"),
      moved("/category/:parent/:slug", "/blog/category/:slug"),
      permanent("/category/:path*", "/blog"),
      permanent("/tag/:path*", "/blog"),
      permanent("/author/:path*", "/our-team"),
      permanent("/page/:page(\\d+)", "/blog/page/:page"),
      permanent("/blog/page/1", "/blog"),
      permanent("/blog/category/:slug/page/1", "/blog/category/:slug"),
      moved("/blog/:slug((?!page$|category$)[^/]+)", "/:slug"),
      permanent("/our-projects", "/case-studies"),
      permanent("/testimonials", "/case-studies"),
      permanent("/about-fawad", "/our-team"),
      permanent("/team-details-2", "/our-team"),
    ];
  },
};

export default nextConfig;
