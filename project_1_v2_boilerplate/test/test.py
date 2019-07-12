import pandas as pd
import datetime
import requests
import json
import sys

import logging

logging.basicConfig()
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

# Get Genesis block
url = 'http://localhost:8000'
genesisBlock = "/block/0"
headers =  {"Content-Type": "application/json"}
resp = requests.get(url+genesisBlock,
                    headers=headers,
                    data=data)
logger.debug(resp.json())

# Request Validation
requestValidation = 'requestValidation'
data = {'address': ''}
resp = requests.post(url+requestValidation,
                     headers  = headers,
                     data = data)
logger.debug(resp.json())

myWallet = ''
signature = ''

# Submit start
submitstart = '/submitstar'
data = { 'address': '',
         'message': '',
         'signature': '',
         'start' : {
           "dec": "68° 52' 56.9",
           "ra": "16h 29m 1.0s",
           "story": "Testing the story 4"
         }
       }

resp = requests.post(url+submitstart,
                     headers  = headers,
                     data = data)
logger.debug(resp.json())

# Retrieve Stars owned by me
blocks = '/blocks'
resp = requests.post(url+submitstart,
                     headers  = headers,
                     data = data)
logger.debug(resp.json())
