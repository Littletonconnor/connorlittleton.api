#!/bin/bash

cd apps/api
pm2 start

cd ../web
pm2 start