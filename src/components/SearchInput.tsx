
interface InputProps {
  onChange: (value: string) => void,
  value: string,
}

interface InputNumberProps {
  onChange: (value: string) => void,
  value: number,
}

interface TextAreaProps {
  onChange: (value: string) => void,
  value: string,
}
interface SelectProps {
  onChange: (value: string) => void,
  value: string,
  optionlist: string[],
}

export function Input({ onChange, value }: InputProps) {
  return (
    <input  onChange={(e) => onChange(e.target.value)} value={value} className='rounded-lg  border border-black p-2' />
  )
}

export function InputAge({ onChange, value }: InputNumberProps) {
  return (
    <input type={"number"} onChange={(e) => onChange(e.target.value)} value={value}
      className={`rounded-lg  border border-black p-2 w-32`} />
  )
}

export function TextArea({ onChange, value }: TextAreaProps) {
  return (
    <textarea rows={4} cols={56} onChange={(e) => onChange(e.target.value)} value={value} className='p-2 rounded-lg border border-black' />
  )
}

export function Select({ onChange, value, optionlist }: SelectProps) {
  return (
    <select
    value={value}
      onChange={(e) => onChange(e.target.value)}
      className='rounded-lg border border-black p-2 w-fit bg-white outline-none'
    >
      {optionlist?.map((item) => (
        <option key={item} value={capitalizeFirstLetter(item)}>
          {capitalizeFirstLetter(item)}
        </option>
      ))}
    </select>
  );
}

function capitalizeFirstLetter(str:string) {
  if (!str) return str; 
  return str.charAt(0).toUpperCase() + str.slice(1);
}

