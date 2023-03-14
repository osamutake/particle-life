#!/usr/bin/env ruby
require 'webrick'
include WEBrick

s = HTTPServer.new(
  :Port => 8000,
  :BindAddress => '127.0.0.1',
  :DocumentRoot => File.join(Dir::pwd, 'dist')
)
trap("INT"){ s.shutdown }
s.start
