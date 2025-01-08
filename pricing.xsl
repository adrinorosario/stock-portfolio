<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html" indent="yes" />
    
    <xsl:template match="/">
        <html>
            <head>
                <title>Pricing Table</title>
                <style>
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid #ccc;
                        padding: 10px;
                        text-align: left;
                    }
                    th {
                        background-color: #f4f4f4;
                    }
                </style>
            </head>
            <body>
                <h1>Pricing Table</h1>
                <table>
                    <tr>
                        <th>Plan Name</th>
                        <th>Price</th>
                        <th>Features</th>
                    </tr>
                    <xsl:for-each select="pricingTable/plan">
                        <tr>
                            <td>
                                <xsl:value-of select="name" />
                            </td>
                            <td>
                                <xsl:value-of select="price" />
                                <xsl:text> </xsl:text>
                                <xsl:value-of select="@currency" />
                            </td>
                            <td>
                                <ul>
                                    <xsl:for-each select="features/feature">
                                        <li><xsl:value-of select="." /></li>
                                    </xsl:for-each>
                                </ul>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
