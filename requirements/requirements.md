# Tysers reimagined: requirements

Version 1, 13 October 2026. ClerksWell.

## Overview

This prototype models tysers.com rebuilt on Umbraco, with the rebuild and migration used as the point at which the improvements from our phase 1 review are made. Each requirement maps to one or more idea numbers (I01–I44) on the internal opportunities page. Content is migrated from the live site wherever it exists; anything new is shown as a bracketed placeholder.

## Global

- R01 Primary navigation by audience, specialty, industry, people, insight and about (I01, I02)
- R02 One name per division used everywhere: Wholesale & Specialty, Tysers Live, Business & Private Clients (I04)
- R03 Make a claim is a distinct, always-visible header action (I06, I11)
- R04 Utility bar: For brokers, Tysers Portal, Offices, Search (I26, I28, I29)
- R05 Site search grouped by type: specialties, people, insight, offices, pages (I03)
- R06 Footer separates "Follow Tysers" and briefings from contact (I21, I25)
- R07 Real figures in HTML; motion only when allowed; pause control on any video (I35, I38)
- R08 en-GB, one H1 per page, written meta descriptions, no empty headings (I40)
- R09 Helpful 404 with search and main routes (I43)
- R10 Accessibility: skip link, visible focus, WCAG 2.2 AA field contrast, content visible without animation (I42)
- R11 Responsive with a collapsible menu at phone width (I42)
- R12 Redirects from every old URL; test pages and empty profiles not migrated (I05, I07, I39)

## Page types

- R20 Home: audience routes, notify a claim, finder, latest report, proof, insight (I01, I06, I35)
- R21 Division landing: Wholesale & Specialty, Tysers Live, Business & Private Clients (I01)
- R22 Business & Private Clients carries a notice tied to the Prestige integration (I31)
- R23 Specialty page template: facts, cover list, whole team with contact details, class claims lead, related insight, prefilled enquiry (I09, I10, I16, I20, I24, I36)
- R24 Industry hub: specialties, people, claims and insight for one industry (I02)
- R25 Specialties A to Z with keyword, division and industry filters (I03, I05)
- R26 People directory with search and filters by division, specialty and office (I08)
- R27 Person profile: role, expertise, contact, office, insight written (I07, I08)
- R28 Claims hub: emergency panel, routing by division and class, verified contacts, guides, case study (I11, I12, I13, I14, I15)
- R29 Notify a claim: stepped form with validation, review and reference number (I11)
- R30 Insight hub: filter by division, type and year; featured report; people news separate (I19, I22, I23)
- R31 Article template: summary, author, reading time, related specialties (I20, I23)
- R32 P&I Report page: findings, video, club comparison, PDF, previous editions, sign-up (I17, I18, I21)
- R33 Routed enquiry form: who, what, where; shows who replies (I24, I30)
- R34 Office finder with every location and regulator (I26, I27)
- R35 For brokers (I29)
- R36 Tysers Portal explainer (I28)
- R37 About with timeline to date, AUB Group and responsibility (I31, I34)
- R38 Regulatory status per entity with reference numbers (I32)
- R39 Briefings sign-up with preferences (I21)

## Modules

- R50 Module library page showing every reusable block once
- R51 Expert card with contact details
- R52 Claims lead panel
- R53 Related insight strip
- R54 Proof strip (figures)
- R55 Enquiry panel prefilled from context

## Technical (Umbraco)

- R60 Content modelled as Umbraco document types with Block List / Block Grid content; editor notes on each page say which
- R61 People held once as content nodes and referenced from specialty, industry, claims and article pages
- R62 Forms built with Umbraco Forms, with conditional fields and routing workflows
- R63 Search on Examine (or a hosted index), with type facets
- R64 Old URLs captured in Umbraco's redirect management at migration
