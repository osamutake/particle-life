#!/usr/bin/env ruby

#
# src/index.html の <script> と <style> に
#
#   obj/particle-life.js
#   obj/particle-life.css
#
# を直接埋め込んで標準出力へ出す
#

File.open("src/index.html", mode = "rt") do |f|
  replacing = false
  f.each_line do |line|
    if line =~ /<!-- replace_begin -->/
      replacing = true;

      puts '<script>'
      File.open("dist/particle-life.js", "r") do |ff|
        print ff.read
      end
      puts '</script>'
      puts '<style>'
      File.open("dist/particle-life.css", "r") do |ff|
        print ff.read
      end
      puts '</style>'
    end

    if replacing
      # do not output line
      replacing &&= line !~ /<!-- replace_end -->/
    else
      print line
    end
  end
end
