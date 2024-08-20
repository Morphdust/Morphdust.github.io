
# coding: utf-8

# # Talks markdown generator for academicpages
# 
# Takes a TSV of talks with metadata and converts them for use with [academicpages.github.io](academicpages.github.io). This is an interactive Jupyter notebook ([see more info here](http://jupyter-notebook-beginner-guide.readthedocs.io/en/latest/what_is_jupyter.html)). The core python code is also in `talks.py`. Run either from the `markdown_generator` folder after replacing `talks.tsv` with one containing your data.
# 
# TODO: Make this work with BibTex and other databases, rather than Stuart's non-standard TSV format and citation style.

# In[1]:

import pandas as pd
import os


# ## Data format
# 
# The TSV needs to have the following columns: title, type, url_slug, venue, date, location, talk_url, description, with a header at the top. Many of these fields can be blank, but the columns must be in the TSV.
# 
# - Fields that cannot be blank: `title`, `url_slug`, `date`. All else can be blank. `type` defaults to "Talk" 
# - `date` must be formatted as YYYY-MM-DD.
# - `url_slug` will be the descriptive part of the .md file and the permalink URL for the page about the paper. 
#     - The .md file will be `YYYY-MM-DD-[url_slug].md` and the permalink will be `https://[yourdomain]/talks/YYYY-MM-DD-[url_slug]`
#     - The combination of `url_slug` and `date` must be unique, as it will be the basis for your filenames
# 


# ## Import TSV
# 
# Pandas makes this easy with the read_csv function. We are using a TSV, so we specify the separator as a tab, or `\t`.
# 
# I found it important to put this data in a tab-separated values format, because there are a lot of commas in this kind of data and comma-separated values can get messed up. However, you can modify the import statement, as pandas also has read_excel(), read_json(), and others.

# In[3]:

repairs = pd.read_csv("repairs.csv", header=0)
#repairs

# ## Escape special characters
# 
# YAML is very picky about how it takes a valid string, so we are replacing single and double quotes (and ampersands) with their HTML encoded equivilents. This makes them look not so readable in raw format, but they are parsed and rendered nicely.

# In[4]:

html_escape_table = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;"
    }

def html_escape(text):
    if type(text) is str:
        return "".join(html_escape_table.get(c,c) for c in text)
    else:
        return "False"


# ## Creating the markdown files
# 
# This is where the heavy lifting is done. This loops through all the rows in the TSV dataframe, then starts to concatentate a big string (```md```) that contains the markdown for each type. It does the YAML metadata first, then does the description for the individual page.

# In[5]:
loc_dict = {}

for row, item in repairs.iterrows():
    md_filename = str(item.date) + "-" + item.url_slug + str(item.repair_num) + ".md"
    html_filename = str(item.date) + "-" + item.url_slug

    md = "---\ntitle: \""   + item.title + '"\n'
    md += "collection: repair" + "\n"
    
    #if len(str(item.type)) > 3:
    #    md += 'type: "' + item.type + '"\n'
    #else:
    #    md += 'type: "Talk"\n'
    
    md += "permalink: /repair/" + html_filename + "\n"
    
    if len(str(item.venue)) > 3:
        md += 'venue: "' + item.venue + '"\n'
    md += 'Date: "' + item.date + '"\n'
    md += 'Problem: "' + item.problem + '"\n'
    md += 'Solution: "' + item.solution + '"\n'

    md += "---\n"

    md += '```\n'
    md += f'Problem:    {item.problem} \n'
    md += f'Solution:   {item.solution} \n'
    md += f'Brand:  {item.brand} \n'
    md += f'Cost new:   {item.cost_new} \n'
    md += f'Cost of fix:    {item.cost_of_fix} \n'
    md += f'Age:    {item.age} \n'
    md += f'Success?:   {item.success} \n'

    md += '```'
    #TODO push git changes

    if len(str(item.description)) > 3:
        md += "\n" + html_escape(item.description) + "\n"
    # add the image here
    #default_md_image_str = f'![alt text](Isolated.png ")'
    split_images_list = item.related_images.split()
    for i, image in enumerate(split_images_list):
        md += f'![]({image})\n'



    md_filename = os.path.basename(md_filename)
    #print(md)

    with open("../_repair/" + md_filename, 'w') as f:
        f.write(md)

# These files are in the talks directory, one directory below where we're working from.

