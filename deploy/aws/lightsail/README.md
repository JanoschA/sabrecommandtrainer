# AWS Lightsail Deployment

This setup is intentionally minimal:

- one Ubuntu Lightsail instance
- one Docker container that serves both the frontend and the API
- one GitHub Actions workflow that redeploys on every push to `master`

## 1. Create the instance

Create a small Ubuntu Lightsail instance and make sure the IPv4 firewall includes at least:

- `SSH` / TCP / `22`
- `HTTP` / TCP / `80`

You can keep `443` for later, but it is not required for the first deploy.

Attach a static IP if you want the server address to stay stable after stop/start cycles.

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

## 3. Optional cloud-init

If you want to bootstrap future instances automatically, you can use [cloud-init.yaml](./cloud-init.yaml).

It now only installs Docker and prepares `/opt/fechttrainer`, without touching UFW. Even so, the safest sequence is still:

1. first instance without launch script
2. verify SSH works
3. use the cloud-init file only for later recreations if you want faster setup

## 4. Configure GitHub Secrets

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

`AWS_LIGHTSAIL_HOST` should be the public IPv4 address or the static IP of the instance.  
`AWS_LIGHTSAIL_USER` is usually `ubuntu`.  
`AWS_LIGHTSAIL_SSH_KEY` should be the full private key content for the instance user.

## 5. Deployment flow

On every push to `master`, GitHub Actions will:

1. sync the repository to `/opt/fechttrainer/app`
2. write `deploy/aws/lightsail/.env.production`
3. run [deploy.sh](./deploy.sh)

The container then:

- builds the React frontend
- builds the Express API
- serves `/api/*` through Express
- serves the built frontend from the same process

## 6. Runtime notes

- The app is exposed on port `80`
- The frontend and backend run on the same origin
- The contact form uses the production SMTP and Turnstile secrets from GitHub Actions
- The GitHub workflow runs on pushes to `master`, so a local commit alone does not deploy anything until it is pushed

## 7. Later improvements

If you want to harden it later, the next sensible steps are:

- add a domain plus HTTPS reverse proxy
- add a small backup strategy
- switch from SSH deploys to image-based deploys
