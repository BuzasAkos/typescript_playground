# Node környezet kialakítása (üres folderből): 
npm init -y
npm install typescript @types/node ts-node fs
npx tsc --init

# start script (package.json):
ts-node src/practice.ts

# github repo klónozása vagy zip letöltése esetén futtatandó:
npm install
npm start

