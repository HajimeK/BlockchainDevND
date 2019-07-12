import pandas as pd
import datetime
import requests
import json
import sys

import logging

logging.basicConfig()
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

url = 'http://localhost:8000'
genesisBlock = "/block/0"
headers =  {"Content-Type": "application/json"}

resp = requests.get(url+genesisBlock,
                    headers=headers,
                    data='')
logger.debug(resp.json())