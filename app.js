function gfxControl() {
    return {
        width: '',
        height: '',
        density: 420,
        apiLog: '',
        applyResolution() {
            if(!this.width || !this.height) return alert('Input dimensi lebar dan tinggi terlebih dahulu!');
            const cmd = `wm size ${this.width}x${this.height}`;
            this.executeCmd(cmd);
        },
        resetResolution() {
            this.executeCmd('wm size reset');
        },
        applyDensity() {
            const cmd = `wm density ${this.density}`;
            this.executeCmd(cmd);
        },
        resetDensity() {
            this.executeCmd('wm density reset');
        },
        setProfile(type) {
            let cmdStr = '';
            if(type === 'balance') cmdStr = 'setprop persist.vendor.power.profile balance';
            if(type === 'performance') cmdStr = 'setprop persist.vendor.power.profile performance';
            if(type === 'extreme') cmdStr = 'setprop adv_thermal.mode 1';
            if(type === 'ultrafps') cmdStr = 'settings put global pointer_speed 7';
            
            this.executeCmd(cmdStr);
        },
        executeCmd(command) {
            const encodedCmd = encodeURIComponent(command);
            fetch(`http://127.0.0.1:8080/api/exec?cmd=${encodedCmd}`)
                .then(res => res.json())
                .then(data => {
                    this.apiLog = `Executed: [${command}] -> Output: ${data.output || 'Success'}`;
                })
                .catch(err => {
                    this.apiLog = `Error executing command via Core API Node. Details: ${err}`;
                });
        }
    }
}