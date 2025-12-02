@echo off

npm run build
set target_dir=C:\development\nginx\nginx-1.27.5\watchdog_html
rmdir /s/q %target_dir%
mkdir %target_dir%
xcopy /s/y .\build C:\development\nginx\nginx-1.27.5\watchdog_html