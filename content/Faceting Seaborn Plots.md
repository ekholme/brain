---
title: Faceting Seaborn Plots
draft: false
date: 2025-03-17
tags:
  - python
  - seaborn
  - data_viz
---
Faceting plots in [Seaborn](https://seaborn.pydata.org/) works slightly different than it does in ggplot. First, you have to instantiate a grid, then you map plots to this grid. In this way, it works kinda like [Makie.jl](https://docs.makie.org/v0.22/) does.

For example, here's how to make a faceted histogram showing the height of different species of palm trees, by their `palm_tribe` type. The data comes from [TidyTuesday](https://github.com/rfordatascience/tidytuesday/blob/main/data/2025/2025-03-18/readme.md)

## Setup

```python
import polars as pl
import seaborn as sns
import matplotlib.pyplot as plt

# read in data
palmtrees = pl.read_csv(
"https://raw.githubusercontent.com/rfordatascience/tidytuesday/main/data/2025/2025-03-18/palmtrees.csv",
encoding="latin1",
null_values="NA",
)

# get the 5 palm_tribes with the most species
n_by_tribe = palmtrees.group_by("palm_tribe").len(name="n").sort("n", descending=True)

top_5_tribes = n_by_tribe.head(5)["palm_tribe"]

top5_df = palmtrees.filter(pl.col("palm_tribe").is_in(top_5_tribes)).drop_nulls("max_stem_height_m")
```

## Create Plot

```python
# create the grid
g = sns.FacetGrid(
top5_df.to_pandas(), col="palm_tribe", col_wrap=2, sharex=True, sharey=False
)

# map plots to grid
g.map(sns.histplot, "max_stem_height_m", bins=20)

# show the plot
plt.show()
```

![[seaborn_faceted_histogram.png]]