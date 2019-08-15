Content-Based addressing (Different from HTTP, which is a Location-Based addressing)

(base) hajime@hajime-DAIV-NG5800:~/Downloads$ sudo snap install ipfs
[sudo] password for hajime: 
Setup snap "ipfs" (1170) security profiles                                                                                  ipfs v0.4.21 from Leo Arias (elopio) installed
(base) hajime@hajime-DAIV-NG5800:~/Downloads$ which ipfs
/snap/bin/ipfs
(base) hajime@hajime-DAIV-NG5800:~/Downloads$ ipfs init
initializing IPFS node at /home/hajime/snap/ipfs/1170/.ipfs
generating 2048-bit RSA keypair...done
peer identity: QmezRHrbp1PVjHMjunPgXSerbpPwcTmo4bEfaox5nEWUWP
to get started, enter:

	ipfs cat /ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv/readme

(base) hajime@hajime-DAIV-NG5800:~/Downloads$ ipfs cat /ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv/readme
Hello and Welcome to IPFS!

██╗██████╗ ███████╗███████╗
██║██╔══██╗██╔════╝██╔════╝
██║██████╔╝█████╗  ███████╗
██║██╔═══╝ ██╔══╝  ╚════██║
██║██║     ██║     ███████║
╚═╝╚═╝     ╚═╝     ╚══════╝

If you're seeing this, you have successfully installed
IPFS and are now interfacing with the ipfs merkledag!

 -------------------------------------------------------
| Warning:                                              |
|   This is alpha software. Use at your own discretion! |
|   Much is missing or lacking polish. There are bugs.  |
|   Not yet secure. Read the security notes for more.   |
 -------------------------------------------------------

Check out some of the other files in this directory:

  ./about
  ./help
  ./quick-start     <-- usage examples
  ./readme          <-- this file
  ./security-notes

ipfs cat /ipfs/QmS4ustL54uo8FzR9455qaxZwuMiUhyvMcX9Ba8nUH4uVv/quick-start
# 0.1 - Quick Start

This is a set of short examples with minimal explanation. It is meant as
a "quick start".


Add a file to ipfs:

  echo "hello world" >hello
  ipfs add hello


View it:

  ipfs cat <the-hash-you-got-here>


Try a directory:

  mkdir foo
  mkdir foo/bar
  echo "baz" > foo/baz
  echo "baz" > foo/bar/baz
  ipfs add -r foo


View things:

  ipfs ls <the-hash-here>
  ipfs ls <the-hash-here>/bar
  ipfs cat <the-hash-here>/baz
  ipfs cat <the-hash-here>/bar/baz
  ipfs cat <the-hash-here>/bar
  ipfs ls <the-hash-here>/baz


References:

  ipfs refs <the-hash-here>
  ipfs refs -r <the-hash-here>
  ipfs refs --help


Get:

  ipfs get <the-hash-here> -o foo2
  diff foo foo2


Objects:

  ipfs object get <the-hash-here>
  ipfs object get <the-hash-here>/foo2
  ipfs object --help


Pin + GC:

  ipfs pin add <the-hash-here>
  ipfs repo gc
  ipfs ls <the-hash-here>
  ipfs pin rm <the-hash-here>
  ipfs repo gc


Daemon:

  ipfs daemon  (in another terminal)
  ipfs id


Network:

  (must be online)
  ipfs swarm peers
  ipfs id
  ipfs cat <hash-of-remote-object>


Mount:

  (warning: fuse is finicky!)
  ipfs mount
  cd /ipfs/<the-hash-here>
  ls


Tool:

  ipfs version
  ipfs update
  ipfs commands
  ipfs config --help
  open http://localhost:5001/webui


Browse:

  webui:

    http://localhost:5001/webui

  video:

    http://localhost:8080/ipfs/QmVc6zuAneKJzicnJpfrqCH9gSy6bz54JhcypfJYhGUFQu/play#/ipfs/QmTKZgRNwDNZwHtJSjCp6r5FYefzpULfy37JvMt9DwvXse

  images:

    http://localhost:8080/ipfs/QmZpc3HvfjEXvLWGQPWbHk3AjD5j8NEN4gmFN8Jmrd5g83/cs

  markdown renderer app:

    http://localhost:8080/ipfs/QmX7M9CiYXjVeFnkfVGf3y5ixTZ2ACeSGyL1vBJY1HvQPp/mdown
