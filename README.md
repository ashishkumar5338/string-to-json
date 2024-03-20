# String-to-json
Convert String to Json and download as .XLSX(Excel file).

## Paste it in your Console
Use this JavaScript Code to extract data received in your mail
```ruby
clear();
let n = document.querySelectorAll(".a3s");
for (let i = 0; i < n.length; i += 2) {
  console.log(n[i].innerText)
}
```

This Script `Only Allow` Following ***`Key` Value pair*** :
>1. "Name"

>2. "E-mail"

>3. "Course"

>4. "Mobile No"

>5. "City"

>6. "State"

>7. "Qualification"

>[!IMPORTANT]
>Above `Key` Must be Followed By ` : `.

> [!NOTE]
>Any Other than above `key value` Pair will be `ignored`.
