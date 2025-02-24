---
title: Quarto Templates in R Packages
draft: false
date: 2025-02-24
tags:
  - quarto
  - R
  - software_dev
---
When developing an [[R]] package, we sometimes might want to include a [[Quarto]] template as part of the package. There might be better ways to approach this, but my approach has been inspired by [Meghan Hall's approach](https://meghan.rbind.io/blog/2024-08-14-quarto-templates/)

Basically, the process entails:
1. Creating the template (and any accompanying files)
2. Creating a function to copy over the template

## Creating the Template

In the R package, the Quarto template should go somewhere within the `inst` directory. Beyond that, I'm not sure it actually matters. My approach has been to include it in `inst/extdata/_extensions`, but this might be a relic of the approach for using Rmarkdown.

Regardless, if (for example), I'm making a template for a school report, I might structure the folder like:

`inst/extdata/_extensions/SchReport/template.qmd`

And then I can define the template however I want. I would also want to include any `.css` or `.scss` files in the `SchReport` directory.

*Note! Despite the naming, these templates are not the same as extensions. A [Quarto Extension](https://quarto.org/docs/extensions/) should probably have its own package, since it should be content-agnostic*

## Creating a Utility Function

Once the template is created, we then want a function to copy that template (and any supplemental files) over to wherever we want to work with it.

My version of the function that does this is similar to [Meghan Hall's version](https://meghan.rbind.io/blog/2024-08-14-quarto-templates/#how-do-i-share-this).

I might have something like:

```r
use_report_template <- function(file_name, ext_name = "SchReport", edit = FALSE) {
	#some checks for input arguments
	ext_path <- paste0("_extensions", ext_name)	

	#copy from pkg to current dir
	file.copy(
	from = system.file(paste0("extdata/_extensions/", ext_name), package = "MyPkg"), #note that this should be the pkg name
    to = paste0("_extensions/"),
    overwrite = TRUE,
    recursive = TRUE,
    copy.mode = TRUE
	)

	pth <- paste0(ext_path, "/template.qmd")
	file.copy(pth, paste0(file_name, ".qmd", collapse = ""))

	if (edit) {
		file.edit(paste0(file_name, ".qmd", collapse = ""))	
	}
}
```

This copies over the relevant template folder (`SchReport` in this case) from `MyPkg` into the current directory and creates a new `.qmd` file named whatever we supply to the `file_name` argument.

We can then render this template using the typical `quarto render` CLI workflow.