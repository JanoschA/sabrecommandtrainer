# AWS Lightsail Deployment

This deployment belongs to:

- website: [https://sabrecommandtrainer.com](https://sabrecommandtrainer.com)
- repository: `JanoschA/sabrecommandtrainer`
 
This setup is intentionally minimal:

- one Ubuntu Lightsail instance
- one app container that serves both the frontend and the API
- one Caddy container that handles HTTPS and reverse-proxies to the app
- one GitHub Actions workflow that builds the image on GitHub
- Lightsail only pulls the finished image and redeploys it on every push to `master`

## 1. Create the instance

Create a small Ubuntu Lightsail instance and make sure the IPv4 firewall includes at least:

- `SSH` / TCP / `22`
- `HTTP` / TCP / `80`
- `HTTPS` / TCP / `443`

Attach a static IP if you want the server address to stay stable after stop/start cycles.

## 1a. Point your domain to the static IP

For the checked-in HTTPS setup to work, your DNS must already point to the Lightsail instance.

This repository currently expects these production hostnames in [Caddyfile](./Caddyfile):

- `sabrecommandtrainer.com`
- `www.sabrecommandtrainer.com`

Create DNS records so both names resolve to the instance's static IPv4 address.

If you later want to use a different domain, update the Caddyfile in the repo and redeploy.

## 2. Prepare the server

The most reliable path is:

1. create the instance without a launch script
2. verify that browser SSH and normal SSH both work
3. then install Docker manually once

SSH into the instance:

```bash
ssh -i "key.pem" ubuntu@YOUR_SERVER_IP
```

Run these commands on the server:

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker ubuntu
sudo mkdir -p /opt/fechttrainer/app
sudo chown -R ubuntu:ubuntu /opt/fechttrainer
```

Reconnect once after `usermod -aG docker ubuntu`, then verify:

```bash
docker --version
docker compose version
```

## 3. Automatic HTTPS with Caddy

The deployment now starts two services:

- `app` on internal Docker port `3000`
- `caddy` on public ports `80` and `443`

Caddy reads [Caddyfile](./Caddyfile), requests free TLS certificates automatically, renews them, redirects HTTP to HTTPS, and proxies traffic to `app:3000`.

As long as:

- DNS points to the server
- ports `80` and `443` are open
- the domain names in the Caddyfile are correct

HTTPS should come up automatically without extra certificate costs.

## 4. Optional cloud-init

If you want to bootstrap future instances automatically, you can use [cloud-init.yaml](./cloud-init.yaml).

It now only installs Docker and prepares `/opt/fechttrainer`, without touching UFW. Even so, the safest sequence is still:

1. first instance without launch script
2. verify SSH works
3. use the cloud-init file only for later recreations if you want faster setup

## 5. Configure GitHub Secrets

Add these repository secrets:

- `AWS_LIGHTSAIL_HOST`
- `AWS_LIGHTSAIL_USER`
- `AWS_LIGHTSAIL_SSH_KEY`
- `GHCR_USERNAME`
- `GHCR_TOKEN`
- `CONTACT_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

`AWS_LIGHTSAIL_HOST` should be the public IPv4 address or the static IP of the instance.  
`AWS_LIGHTSAIL_USER` is usually `ubuntu`.  
`AWS_LIGHTSAIL_SSH_KEY` should be the full private key content for the instance user.  
`GHCR_USERNAME` is your GitHub username.  
`GHCR_TOKEN` should be a GitHub token with at least `read:packages` so the server can pull from GHCR.

### Create `GHCR_TOKEN`

Create a GitHub personal access token (classic):

1. GitHub -> `Settings`
2. `Developer settings`
3. `Personal access tokens`
4. `Tokens (classic)`
5. `Generate new token (classic)`

Recommended settings:

- name: `sabrecommandtrainer-ghcr-read`
- expiration: whatever you prefer
- scope: `read:packages`

Then save the token as the `GHCR_TOKEN` repository secret and your GitHub username as `GHCR_USERNAME`.

If your GHCR package stays private, the server needs those credentials permanently to pull updates.

## 6. Deployment flow

On every push to `master`, GitHub Actions will:

1. build the Docker image on GitHub
2. push it to GHCR
3. sync the repository to `/opt/fechttrainer/app`
4. write `deploy/aws/lightsail/.env.production`
5. run [deploy.sh](./deploy.sh)

The server then:

- logs into GHCR if credentials are present
- pulls the new image
- starts or updates the app container
- starts or updates the Caddy container
- serves `/api/*` through Express
- serves the built frontend from the same process
- exposes the site through Caddy on HTTP and HTTPS

## 7. Runtime notes

- The public entrypoint is Caddy on ports `80` and `443`
- The app itself stays internal on Docker port `3000`
- The frontend and backend run on the same origin
- The contact form uses the production SMTP and Turnstile secrets from GitHub Actions
- The GitHub workflow runs on pushes to `master`, so a local commit alone does not deploy anything until it is pushed
- This setup is much friendlier to small Lightsail instances because Docker builds no longer run on the server
- Caddy stores certificates and ACME state in persistent Docker volumes

## 8. Later improvements

If you want to harden it later, the next sensible steps are:

- add a small backup strategy
- switch from SSH deploys to image-based deploys
