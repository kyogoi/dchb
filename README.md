## Requirements  
<strong>- Supabase setup with schema:</strong>
![](https://i.imgur.com/cw2ErMU.png)

## Via install script
```
sudo apt-get update
sudo apt-get upgrade
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs nginx
sudo systemctl enable nginx
cd ~
wget https://raw.githubusercontent.com/solwynn/dchb/refs/heads/main/e2-micro-install.sh
chmod +x e2-micro-install.sh
./e2-micro-install.sh
sudo npm install pm2 -g
cd ~/dchb
npm install
```

## Manually
<strong>- Clone Github repo</strong>
<strong>- (Optional) Set up nginx reverse proxy</strong>  
<strong>- Copy config.json.example -> config.json and populate</strong>    


## Console output
```index.js --noisy=true```

## Get Token

<strong>Run code (Discord Console - [Ctrl + Shift + I])</strong>

```js
window.webpackChunkdiscord_app.push([
  [Math.random()],
  {},
  req => {
    if (!req.c) return;
    for (const m of Object.keys(req.c)
      .map(x => req.c[x].exports)
      .filter(x => x)) {
      if (m.default && m.default.getToken !== undefined) {
        return copy(m.default.getToken());
      }
      if (m.getToken !== undefined) {
        return copy(m.getToken());
      }
    }
  },
]);
console.log('%cWorked!', 'font-size: 50px');
console.log(`%cYou now have your token in the clipboard!`, 'font-size: 16px');
```