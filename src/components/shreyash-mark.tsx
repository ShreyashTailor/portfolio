export function ShreyashMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 512 256"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M64 128H0v-128h64v128ZM64 256H0v-64h64v64ZM128 64H64v-64h64v64ZM128 256H64v-128h64v128ZM192 64H128v-64h64v64ZM192 256H128v-128h64v128ZM320 64H256v-64h64v64ZM448 256H320v-256h128v256ZM512 64H448v-64h64v64Z"
      />
    </svg>
  )
}

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 128"><path fill="currentColor" d="M32 64H0v-64h32v64ZM32 128H0v-32h32v32ZM64 32H32v-32h32v32ZM64 128H32v-64h32v64ZM96 32H64v-32h32v32ZM96 128H64v-64h32v64ZM160 32H128v-32h32v32ZM224 128H160v-128h64v128ZM256 32H224v-32h32v32Z"/></svg>`
}
