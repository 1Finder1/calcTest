const { assert } = require('chai');

function getResult(exp) {
    try {
        // Проверяем, что exp — непустая строка и содержит только разрешенные символы
        if (typeof exp !== "string" || exp.trim() === "" || !/^[0-9+\-*/(). ]+$/.test(exp)) {
            throw new Error();
        }

        // Создаем функцию, если выражение корректное
        const fun = new Function(`return (${exp})`);
        return fun();
    } catch (e) {
        console.error("Ошибка",);
        return "Ошибка";
    }
}



describe('getResult', function () {

    // assert.equal - Проверяет равенство значений без учета типа
    it('Должен возвращать 10 для выражения "5+5" (assert.equal)', function () {
        assert.equal(getResult('5+5'), 10);
    });

    it('Должен возвращать "Ошибка" для выражения "5+" (assert.equal)', function () {
        assert.equal(getResult('5+'), 'Ошибка');
    });

    // assert.strictEqual - Проверяет равенство значений с учетом типа
    it('Должен строго возвращать 15 для выражения "10+5" (assert.strictEqual)', function () {
        assert.strictEqual(getResult('10+5'), 15);
    });

    it('Должен возвращать "Ошибка" для выражения "10+" (assert.strictEqual)', function () {
        assert.strictEqual(getResult('10+'), 'Ошибка');
    });

    // assert.notEqual - Проверяет, что значения не равны
    it('Должен возвращать не 20 для выражения "2+2" (assert.notEqual)', function () {
        assert.notEqual(getResult('2+2'), 20);
    });

    it('Должен возвращать "Ошибка", а не 4, для выражения "+" (assert.notEqual)', function () {
        assert.notEqual(getResult('+'), 4);
    });

    // assert.isAbove - Проверяет, что число больше указанного
    it('Результат "10+5" должен быть больше 10 (assert.isAbove)', function () {
        assert.isAbove(getResult('10+5'), 10);
    });

    it('Результат "2-2" не должен быть больше 0 (assert.isAbove)', function () {
        assert.isAbove(getResult('2-2'), 0, 'Результат 2-2 должен быть 0');
    });

    // assert.isBelow - Проверяет, что число меньше указанного
    it('Результат "2+2" должен быть меньше 10 (assert.isBelow)', function () {
        assert.isBelow(getResult('2+2'), 10);
    });

    it('Результат "100/2" не должен быть меньше 10 (assert.isBelow)', function () {
        assert.isBelow(getResult('100/2'), 10, 'Результат 100/2 должен быть 50');
    });

    // assert.isNaN - Проверяет, что значение NaN
    it('Результат "0/0" должен быть NaN (assert.isNaN)', function () {
        assert.isNaN(getResult('0/0'));
    });

    it('Результат "5+5" не должен быть NaN (assert.isNaN)', function () {
        assert.isNotNaN(getResult('5+5'), '5+5 должно быть числом, а не NaN');
    });

    // assert.isString - Проверяет, что значение строка
    it('Результат ошибки должен быть строкой (assert.isString)', function () {
        assert.isString(getResult('1*'));
    });

    it('Результат "5+5" не должен быть строкой (assert.isString)', function () {
        assert.isNotString(getResult('5+5'), 'Результат выражения 5+5 должен быть числом');
    });

});
