#!/bin/bash
# Bash script to set up an environment for this on any VM
# Presumes we're using the free tier Google cloud e2-micro

cat << EOF
----------------------------

We'll be creating an nginx reverse proxy with the assumption that our port is 5000.
If you've decided to use a different port, change it before accepting this process at ~/dchb/conf/reverse-proxy.conf
    or at /etc/nginx/sites-available/reverse-proxy after

----------------------------

EOF

read -p "Are you sure? [Y/N]" -n 1 -r
echo    
if [[ $REPLY =~ ^[Yy]$ ]]
then
    mkdir ~/dchb
    git clone https://github.com/solwynn/dchb ~/dchb
    sudo unlink /etc/nginx/sites-enabled/default
    sudo cp ~/dchb/conf/reverse-proxy.conf /etc/nginx/sites-available/reverse-proxy
    sudo cp /etc/nginx/sites-available/reverse-proxy /etc/nginx/sites-enabled/
    cp ~/dchb/config.json.example ~/dchb/config.json
    echo "Done! Be sure to update your token, port, and Supabase info in config.json"
fi

