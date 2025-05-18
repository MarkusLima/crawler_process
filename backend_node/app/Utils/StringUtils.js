class StringUtils {

    static temAcento(str) {

        const regex = /[À-ú]/g;

        return regex.test(str);

    }

    static temCedilha(str) {

        const regex = /[ç]/g;

        return regex.test(str);

    }

    static removerAcentosECedilha(palavra) {

        return palavra.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    }

    static apenasLetras(palavra) {

        // Se palavra for null ou indefinida
        if (!palavra) return null;

        // Permite apenas letras, letras acentuadas e espaço
        let resultado = palavra.replace(/[^a-zA-ZÀ-ú ]/g, ' ');
        // Remove espaços duplicados
        resultado = resultado.replace(/\s+/g, ' ');
        // Coloca as letras iniciais em maiúsculo
        resultado = resultado.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

        return resultado.trim();

    }

    static apenasLetrasEspacoNumeros(palavra) {

        // Se palavra for null ou indefinida, retorna null
        if (!palavra) return null;

        // Permite apenas letras, letras acentuadas e espaço
        let resultado = palavra.replace(/[^a-zA-ZÀ-ú0-9 ]/g, ' ');
        // Remove espaços duplicados
        resultado = resultado.replace(/\s+/g, ' ');
        // Coloca as letras iniciais em maiúsculo
        resultado = resultado.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

        return resultado.trim();

    }

    /**
     * Separa o texto em partes.
     * @param {string} texto - O texto.
     * @param {number} limite - O tamanho.
     * @returns {array} - Array com partes do texto.
     */
    static separarTexto(texto, limite) {

        const partes = [];

        while (texto.length > limite) {

            let corte = texto.lastIndexOf(' ', limite);

            // Caso não encontre um espaço antes do limite, faz o corte no próprio limite.
            if (corte === -1) corte = limite;

            // Adiciona a parte cortada ao array de partes
            partes.push(texto.slice(0, corte));

            // Remove a parte cortada do texto
            texto = texto.slice(corte).trim();

        }

        // Adiciona o restante do texto (se existir) como a última parte
        if (texto.length > 0) partes.push(texto);

        return partes;

    }
}

module.exports = StringUtils;
