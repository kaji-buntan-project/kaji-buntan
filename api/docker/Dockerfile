FROM php:8.2-apache

ENV APP_HOME /var/www/html

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash

# install all the dependencies and enable PHP modules
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    procps \
    unzip \
    libicu-dev \
    zlib1g-dev \
    libxml2 \
    libxml2-dev \
    libreadline-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    supervisor \
    libzip-dev \
    nodejs

RUN npm install n -g \
    && n stable \
    && apt purge -y nodejs npm \
    && docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd \
    && docker-php-ext-install \
    pdo_mysql \
    intl \
    zip && \
    rm -fr /tmp/* && \
    rm -rf /var/list/apt/* && \
    rm -r /var/lib/apt/lists/* && \
    apt-get clean

# install GD
RUN docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/
RUN docker-php-ext-install -j$(nproc) gd
# install bcmath
RUN docker-php-ext-install bcmath

# change uid and gid of apache to docker user uid/gid
RUN usermod -u 1000 www-data && groupmod -g 1000 www-data
RUN chown -R www-data:www-data $APP_HOME

RUN  a2enmod rewrite

# copy php.ini
COPY ./docker/php/php.ini /usr/local/etc/php/php.ini

# copy apache config file
COPY ./docker/apache2/sites-available/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY ./docker/apache2/apache2.conf /etc/apache2/apache2.conf

# install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer

# create composer folder for user www-data
RUN mkdir -p /var/www/.composer && chown -R www-data:www-data /var/www/.composer

# working dir
WORKDIR $APP_HOME

USER root
