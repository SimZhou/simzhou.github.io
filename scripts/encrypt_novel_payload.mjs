#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes, pbkdf2Sync, createCipheriv } from "node:crypto";

function encodeBase64(buffer) {
  return Buffer.from(buffer).toString("base64");
}

async function main() {
  const [inputPath, outputPath, password] = process.argv.slice(2);
  if (!inputPath || !outputPath || !password) {
    console.error("Usage: node scripts/encrypt_novel_payload.mjs <input.json> <output.json> <password>");
    process.exit(1);
  }

  const source = JSON.parse(await fs.readFile(inputPath, "utf8"));
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = pbkdf2Sync(password, salt, 210000, 32, "sha256");

  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const plaintext = Buffer.from(JSON.stringify(source), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();

  const payload = {
    kdf: "PBKDF2",
    hash: "SHA-256",
    iterations: 210000,
    cipher: "AES-256-GCM",
    salt: encodeBase64(salt),
    iv: encodeBase64(iv),
    tag: encodeBase64(tag),
    ciphertext: encodeBase64(ciphertext),
    meta: source.meta ?? {},
  };

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(payload, null, 2), "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

