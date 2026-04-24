# AWS Lightsail Deployment

This setup is intentionally minimal:

- one Ubuntu Lightsail instance
- one Docker container that serves both the frontend and the API
- one GitHub Actions workflow that redeploys on every push to `master`

## 1. Create the instance

- Create a small Ubuntu Lightsail instance
- Open ports `80` and `443`
- Use [cloud-init.yaml](./cloud-init.yaml) as the launch script

## 2. Configure GitHub Secrets

Add these repository secrets:

- `AWS_LIGHTSAIL_HOST`
- `AWS_LIGHTSAIL_USER`
- `AWS_LIGHTSAIL_SSH_KEY`
- `CONTACT_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

`AWS_LIGHTSAIL_SSH_KEY` should be the full private key content for the instance user.

## 3. Deployment flow

On every push to `master`, GitHub Actions will:

1. sync the repository to `/opt/fechttrainer/app`
2. write `deploy/aws/lightsail/.env.production`
3. run [deploy.sh](./deploy.sh)

The container then:

- builds the React frontend
- builds the Express API
- serves `/api/*` through Express
- serves the built frontend from the same process

## 4. Runtime notes

- The app is exposed on port `80`
- The frontend and backend run on the same origin
- The contact form uses the production SMTP and Turnstile secrets from GitHub Actions

## 5. Later improvements

If you want to harden it later, the next sensible steps are:

- add a domain plus HTTPS reverse proxy
- add a small backup strategy
- switch from SSH deploys to image-based deploys
