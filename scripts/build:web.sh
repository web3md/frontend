#!/bin/bash

expo build:web
web_build_return_code="$?"

echo "web3md.io" > web-build/CNAME

exit "${web_build_return_code}"
