function recoveryControl() {
    return {
        consoleOutput: [],
        auditDatabase(path) {
            this.consoleOutput.push(`<span class="text-cyber-accent">[LAUNCH SCAN]:</span> Mengakses direktori target: ${path}`);
            // Safely list files via ls -la inside specific target directory without compromising any shell rules
            const cmd = `ls -lh ${path}`;
            const encoded = encodeURIComponent(cmd);
            
            fetch(`http://127.0.0.1:8080/api/exec?cmd=${encoded}`)
                .then(res => res.json())
                .then(data => {
                    if(data.output) {
                        const clearLines = data.output.replace(/\n/g, '<br/>');
                        this.consoleOutput.push(`<span class="text-emerald-400">[SCAN COMPLETED]:</span><br/>${clearLines}`);
                    } else {
                        this.consoleOutput.push(`<span class="text-amber-500">[STATUS]:</span> Direktori kosong atau memerlukan izin Storage ekstra.`);
                    }
                })
                .catch(err => {
                    this.consoleOutput.push(`<span class="text-rose-500">[API CONNECTION FAILED]:</span> Gagal melakukan fetch data shell ADB internal.`);
                });
        }
    }
}