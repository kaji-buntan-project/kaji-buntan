# Use node:20-bullseye-slim as the base image
FROM node:20-bullseye-slim

# Install required dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    gcc

# Install Rust and wasm-pack
RUN curl https://sh.rustup.rs -sSf | sh -s -- --profile minimal --default-toolchain stable -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# Set the working directory
WORKDIR /var/www/html