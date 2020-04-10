export default class Utils {
    static addCommas(x) {
        if(!x) return
        x = x.toString();
        const y = x.split(".")
        x = y[0]
        const afterDecimal = y.length > 1 ? `.${y[1]}` : ""
        let lastThree = x.substring(x.length - 3);
        const otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers != "")
            lastThree = `,${lastThree}`;
        return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterDecimal;
    }
}
