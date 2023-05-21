#!/bin/bash

cd apps/api
pm2 start

cd ../www
pm2 start