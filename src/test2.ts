let vee = [33,1,2,3,4,5,6,7,8,9,10,11,12];

for(const n of vee) {
  let np = n+1;
  console.log(n, np);
}


//"runtimeArgs": ["run", "--allow-read", "--allow-write", "--allow-net", "--inspect", "src/app.ts", "maum.png"],
//"runtimeArgs": ["run", "--allow-read", "--allow-write", "--allow-net", "--inspect", "test2.ts"],
//"--inspect-brk=127.0.0.1:33333"
/*
{
  "configurations": [
      {
          "type": "pwa-node",
          "request": "launch",
          "name": "Debug test",
          "cwd": "${workspaceFolder}",
          "runtimeExecutable": "deno",
          "runtimeArgs": [
            "run",
            "--unstable",
            "--inspect-brk",
            "-A",
            "--allow-all",
            "test2.ts"
          ],
          "outputCapture": "std",
          "port": 33333
      }
  ]
}
*/