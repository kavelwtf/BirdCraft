const Discord = require(`discord.js`);
const config = require(`../config.json`)
const client = new Discord.Client()
const package = require(`../package.json`)
const fs = require(`fs`)
const path = require(`path`)


module.exports = {
    commands: `regulamin`,
    callback: async (message, args) => {

const embed = new Discord.MessageEmbed()
.setTitle("**Regulamin serwera BirdCraft.pl**")
.setColor("RED")
.setDescription(`:closed_book:  | Regulamin Serwera Discord
§1. Zakaz wykorzystywania możliwych błędów na serwerze, należy je natychmiast zgłosić.
§2. Zakazane jest poruszanie tematów wulgarnych/erotycznych/religijnych/rasistowskich/politycznych itp.
§3. Nie dodawaj reakcji obrażających kogoś pod wiadomościami i nie spamuj nimi.
§4. Zakazane jest spamowanie i nadmierne pisanie capsem.
§5. Zachowaj kulturę i poziom wypowiedzi.
§6. Zakaz obrażania użytkowników, administracji, moderacji i serwera.
§7. Zakazane jest prowokowanie do kłótni.
§8. Zakazane jest podszywanie się pod użytkowników serwera.
§9. Zakaz pisania rzeczy niezgodnych z tematyką kanału.
§10. Zakaz używania komend oraz wysyłania zdjęć/gifów na kanałach do tego niewskazanych.
§11. Bądź tolerancyjny wobec innych, nie obrażaj ich religii lub orientacji seksualnej.
§12. Zakaz jakiegokolwiek handlu.
§13. Zakaz reklamowania się.
§14. Nie wysyłaj nic o treści 18+.
§15. Zakaz bezpodstawnego pingowania moderacji (również oznaczanie w odpowiedziach).
§16. Trollowanie na kanałach jest zabronione.
§17. Po przeczytaniu ogłoszenia czy innej ważnej rzeczy zostaw po sobie ślad (np. reakcja pod postem).\m§18. Nie wysyłaj na kanał i na priv filmików crashujących m.in. Discorda i innych programów.\n\n**Jeśli akceptujesz regulamin kliknij w reakcje.**`)
.setThumbnail("https://imgur.com/KTwzOjd")
.setImage("https://imgur.com/KTwzOjd")
.setFooter("BirdCraft.pl")
message.channel.send(embed)
message.delete();
    }
}