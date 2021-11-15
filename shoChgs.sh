#!/bin/sh

# grep -rn ".($1" *
 grep -rn --exclude-dir={node_modules,.git} ".($1" * | awk '{ n = index($0,":"); a = substr($0,n+1); p = index(a,":"); printf "%70s %4d %s\n", substr($0,1,n-1), substr(a,1,p-1), substr(a,p+1) }'

