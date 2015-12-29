# sam
Smart Application Manager is a window manager designed to bring desktop apps to your TV as simply as possible

It's aimed to control a smart TV, with the main problem of smart TV's in mind : I want to control it with *whatever I have at hand right now*.

First features will be HTTP remote + keyboard controls. with an ability to start a set of desktop applications.

The philosophy of this software is : Why create a bloated *smart TV* software to rule them all when we can simply use all those little desktop apps?

Launch an app or launch a service, then watch them work for you.

Still love [kodi](http://kodi.wiki/)? Don't worry, it's an app. Just launch it and you've got all the sweetness you love.

## technologies

Running on top of [electron](https://github.com/atom/electron) or nodejs, it brings together a set of technologies :

- freedesktop specifications :
  - [desktop entries](http://www.freedesktop.org/wiki/Specifications/desktop-entry-spec/)
  - [icon specification](http://standards.freedesktop.org/icon-theme-spec/icon-theme-spec-latest.html)
  - [menu specification](http://standards.freedesktop.org/menu-spec/latest/)
- A simple window manager based on [node-x11](https://github.com/sidorares/node-x11) (not yet compliant with [wm-spec](http://standards.freedesktop.org/wm-spec/wm-spec-1.4.html))
- Web components :
  - A REST web API designed to control the window manager
  - A modern webapp to control this API

Many of those components were first developped for and by [holusion](http://holusion.com).

## Code Organisation

- _/*_ electron-specific code.
- _/static/*_ html/css/js files for the frontend
- _/lib/*_ generic nodejs code for the backend.

## Contributing

It's an early-stage project so for the moment it principally need manifestations of interest and confrontation of ideas. Don't hesitate!
