#!/bin/sh
set -e
TMP=$(mktemp -d)
echo "building JS files"
mkdir -p build
npm run browserify
echo "building electron app"
electron-packager . ${npm_package_name} --platform=linux --arch=x64 --version=1.1.1 --asar=true --overwrite=true --prune=true  \
  --ignore="node_modules/(electron-packager|electron-prebuilt|\.bin)|components|.*\.deb"

echo "creating destination structure in $TMP"
mkdir -p $TMP/usr/bin
mkdir -p $TMP/usr/lib

echo "creating DEBIAN files"
mkdir $TMP/DEBIAN
cat >$TMP/DEBIAN/control <<EOF_
Package: ${npm_package_name}
Section: Utilities
Priority: extra
Version: ${npm_package_version}
Build-Depends: nodejs (>=4.0.0)
Depends: libgtk2.0-0, libudev0 | libudev1, libgcrypt11 | libgcrypt20, libgconf-2-4, libnss3
Recommends: lsb-release
Maintainer: ${npm_package_author_name} <${npm_config_email}>
Homepage: ${npm_package_repository_url}
Architecture: amd64
Description:A simple application manager

EOF_


echo "moving app"
mv ${npm_package_name}-linux-x64 $TMP/usr/lib/${npm_package_name}
cat >$TMP/usr/bin/${npm_package_name} <<_EOF_
#!/bin/sh
exec "/usr/lib/sam/sam" $@
_EOF_
chmod +x $TMP/usr/bin/sam
echo "building deb file"
dpkg-deb --build $TMP "${npm_package_name}_${npm_package_version}.deb"

echo "deleting build dir"
rm -rf $TMP

#git config user.name "$GIT_NAME"
#git config user.email "$GIT_EMAIL"
#git checkout gh-pages
#git rm -f --cached build/*
#mv "${npm_package_name}_${npm_package_version}.deb" build/

#dpkg-scanpackages build > build/Packages
#cat Packages| gzip -9c > build/Packages.gz


#git add "build/${npm_package_name}_${npm_package_version}.deb" Packages Packages.gz
