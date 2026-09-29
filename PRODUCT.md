# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Mixed audience, no single primary visitor. The site works as Diego Cornejo's personal identity hub / digital business card. Likely arrivals:

- Recruiters and hiring managers evaluating him for SRE, DevOps or software architecture roles.
- Companies looking for infrastructure, IoT or architecture help.
- Engineers who arrive from the blog or GitHub.

Their job: understand quickly who Diego is and what he does, then go to the right place (blog, GitHub, LinkedIn or email).

## Product Purpose

Personal site at diegocornejo.com (apex and www). It introduces Diego as an SRE / DevOps engineer / software architect / full-stack developer and routes visitors to his real channels. Success: a visitor leaves knowing his focus areas and clicks through to a channel that fits them.

The same Vercel project also runs per-subdomain redirects (Redis-backed, fallback to the blog) and small API utilities. The home page is one surface inside that project, not the whole project.

## Positioning

The differentiator is hands-on IoT / LoRaWAN depth (binary payload decoding, protocol engineering, telemetry, device communication) combined with experience running SaaS in telecom and connected-device environments, on top of cloud infrastructure and SRE. Plenty of engineers do cloud/SRE; far fewer also do device protocols and telecom SaaS operations.

## Operating Context

- Visitors arrive from LinkedIn, GitHub, the blog (blog.diegocornejo.com), email signatures and search.
- Channels the site points to: blog.diegocornejo.com, github.com/diegofcornejo, linkedin.com/in/diego-cornejo-devops-sre, info@diegocornejo.com.
- Deployed on Vercel. `vercel.json` rewrites `/` to `public/home.html` only for the apex and www hosts; every other path goes to `api/index.js`.

## Capabilities and Constraints

- The home page stays a single static HTML file (`public/home.html`) with inline CSS/JS. No framework, no build step.
- Files in `public/` are served before rewrites. Never add `public/index.html`, because it would shadow the subdomain redirect catch-all.
- Page copy is in English. (`public/dani.html` is a separate, unrelated Spanish page.)
- Open: a projects / case-studies section will be added later. Which projects go in it has not been decided yet.

## Brand Commitments

- Name: Diego Cornejo. Role line: "SRE · DevOps · Software Architecture · IoT".
- The animated terminal / CLI identity (for example `diego@home :~$ whoami`, `cat profile.json`) is a binding brand element. Keep it.
- Existing assets: favicon.svg, favicon.ico, apple-touch-icon.png, plus the logo shown in the header.
- Voice: first person, plain and technical, no hype ("I build reliable systems.").

## Evidence on Hand

- Real links: blog, GitHub, LinkedIn, email (see Operating Context).
- Expertise areas and tech stack as written in `public/home.html`.
- Not on hand: client logos, testimonials, metrics or case studies. Do not make any of these up. Projects are only added once Diego supplies them.

## Product Principles

1. Truth over polish: every claim, link and project has to be real.
2. Lead with the rare combination (IoT/protocols + telecom SaaS + cloud/SRE), not generic DevOps buzzwords.
3. Route, don't trap: the page's job is to get each kind of visitor to the right channel quickly.
4. Stay simple to operate: one static file that anyone can deploy and edit by hand.
