document.addEventListener("DOMContentLoaded", function() {
  var metaTag = document.createElement('meta');
  metaTag.name = "robots";
  metaTag.content = "noindex, nofollow, noarchive, nosnippet, notranslate, noimageindex";

  var titleTag = document.querySelector('title');
  document.head.insertBefore(metaTag, titleTag);
});
