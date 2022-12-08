async function generate() {
    const { randomUUID } = await import("node:crypto");
    console.log(randomUUID());
}
generate()