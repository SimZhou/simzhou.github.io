# Writing
## Writing Blog
Open 'content' folder with Typora

## Writing Notes
Open 'notebook.simzhou.com\zh' folder with Typora

# Build/Dev Notes
**Build:**
hugo 
hugo -D
yarn build

**Dev:**
hugo server
hugo server -D
hugo server -D --disableFastRender
yarn dev


# Vuepress Files
.vuepress_temp
node_modules
notebook.simzhou.com
package.json
yarn.lock
yarn-error.log

# gitignore
.vuepress_temp
node_modules

# requirements
hugo-extended(Global)
nodejs
yarn
vuepress

===================Notes============================
Hugo: The difference of "featuredImage" and "featuredImagePreview":
"featuredImage" takes article dir as working dir
"featuredImagePreview": takes site root dir as working dir