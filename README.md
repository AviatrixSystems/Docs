# Technical Contributor Guide
This repository contains documentation for Aviatrix written using the [reStructuredText](http://docutils.sourceforge.net/rst.html) format.

# Publishing
HTML documentation is generated using [Sphinx](http://www.sphinx-doc.org/).  Shortly after a commit is pushed to this repository, the latest source is turned into HTML files and published to [docs.aviatrix.com](https://docs.aviatrix.com).

## How To Generate
If you'd like to generate the documentation yourself, follow the steps outlined below.

### Install Sphinx
1. Install the latest version of [Sphinx](http://www.sphinx-doc.org/en/stable/install.html)

2. Install [sphinx-rtd-theme](https://github.com/rtfd/sphinx_rtd_theme)

   ```pip install sphinx-rtd-theme```

3. Install [sphinxcontrib-disqus](https://pypi.python.org/pypi/sphinxcontrib-disqus)

   ```pip install sphinxcontrib-disqus```


### Build output with Sphinx
To generate the output, use the `sphinx-build` command.  It has a lot of options; but, the simple case of generating HTML output looks like:

```sphinx-build -b html . ./output```



