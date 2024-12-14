# ReClarker

Full-stack web application that allows artists to buy, sell, and promote their artwork.

Technology used -

React, Redux, Express, and MongoDB, mongoose, StripeJs, aws-sdk, multer-s3, AWS s3

<img src="./reclarker-main.jpg">
<img src="./reclarker-popular-artists-component.png">
<img src="./reclarker-artist-scroller.png">

## Table of Contents

- [ReClarker](#reclarker)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
    - [Env Variables](#env-variables)
    - [Install Dependencies (frontend \& backend)](#install-dependencies-frontend--backend)
    - [Run](#run)

## Requirements

- Node 0.10.x
- Mongo Atlas account, and free-tier Cluster
- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a Stripe Account to attain a publishable key and secret key
- Create AWS account

### Env Variables

create a file in the root of your project directory `.env` and add the following

```
PORT=the port of your choosing
AWS_REGION=
BUCKETNAME=
ACCESS_KEY=access key id you obtain from aws
SECRET_KEY=secret access key
MONGO_URI=mongodb+srv://[username]:....@....mongodb.net/?retryWrites=true&w=majority&appName=Clusters
JWT_SECRET=some string of your choosing
STRIPE_PUBLISHABLE=pk_test_....your publishable key
STRIPE_SECRET_KEY=sk_test_....your secret key
```

### Install Dependencies (frontend & backend)

```
# from project directory
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:5173) & backend (:5006) for development
npm run dev
# Run backend only
npm run start
# Run frontend only
npm run client
```
