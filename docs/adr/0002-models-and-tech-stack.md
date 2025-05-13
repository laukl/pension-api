# 2. Models and tech stack

Date: 2025-05-13

## Status

Accepted

## Context

The requirement is to build a API that exposes some pensions data as REST endpoints.

Given the iniitial JSON, there were 2 keys of array of objects called `pensionPots` and `searchedPensions`.

## Decision

Both `pensionPots` and `searchedPensions` are combined as an assumption that both entities are technically pension pots, but `searchedPensions` are with additional metadata.

Hence, the [ERD](../erd.md) reflects this with `PotSearch` being related to `PensionPot`.

Pension providers are inserted as their own table as it can be reused/related to multiple pots.

Fastify, PrismaORM, and Postgres will be used to create the API due to its simplicity and extensibility.

The project will be dockerized for streamlined deployment and development — with unit and end-to-end tests setup for CI/CD.

An image will be released to `ghcr.io/laukl/pensions-api:latest`.

## Assumptions

- Searched pensions and pension pots are the same entity — where searched has more metadata like `status` and `foundOn`.
- Forecasted pot value is calculated using Future Value of Annuity formulate for contributions and initial amount.
