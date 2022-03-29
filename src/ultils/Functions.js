const isPhoneNumber = (phoneNumber) => {
    const regex = /^([0])+([0-9]{9})\b$/;
    return regex.test(phoneNumber);
}

const isPersonName = (name) => {
    const regex = /^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]){2,}/;
    return regex.test(name);
}

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export {
    isPhoneNumber,
    isPersonName,
    randomNumber
}