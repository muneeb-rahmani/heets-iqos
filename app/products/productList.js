import React from 'react'
import ProductCard from '../components/Products/product-card'
import HeroSection from '../components/Header'

const ProductList = ({data}) => {
  return (
    <div>
      <HeroSection 
        header={data?.acf_fields.h1title} 
        featureImg={data?.acf_fields.hero_section_png_image} 
        shortDesc={data?.acf_fields.shortdiscription}
      />
      {data?.category_data
        // .filter(item => includedCategories.includes(item.category)) // Exclude unwanted categories
        ?.map((item, index) => (
          // item.length > 0 && (
            <section key={index} className="odd:bg-white py-4 even:bg-[#f1f1f1]">
              <div className="container mx-auto px-4">
                <div>
                  {/* {item.length > 0 && ( */}
                    <div className="flex flex-col items-center justify-center mb-6">
                      <Link href={`${item.parent_category.parent_slug}/${item?.category_slug}` || "#"}>
                        <h2 className={`text-2xl md:text-4xl font-bold text-center ${index !== 0 ? "mt-10" : ""}`}>
                          {item?.category_name}
                        </h2>
                      </Link>
                      <span className="w-[100px] border-b-red-800 h-2 border-b-4"></span>
                    </div>
                  {/* )} */}
                  <div className="grid grid-cols-2 gap-3 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {item.products.map((product) => (
                      // product.stock_status === "instock" && (
                      <ProductCard
                        key={product?.product_id}
                        title={product.product_name}
                        image={product.product_image || ""}
                        productUrl={`/products/${product.product_slug}`}
                        price={product.sale_price}
                        // rating={product.average_rating}
                        reviews={product.total_reviews}
                        details={product.stock_status === "instock" ? "In Stock" : "Out of Stock"}
                        isDisabled={product.stock_status === "instock" ? false : true}
                        origin={product?.proorigincard}
                        id={product.product_id}
                        quantity={quantity[product.product_id] || 1}
                        reviewCount={product.total_reviews}
                        soldItems={product?.total_sold}
                        originalPrice={product?.regular_price}
                        onAddCart={() =>
                          addToCart(product.product_id, product.product_name, product.sale_price, product.product_image)
                        }
                        incrementQuantity={() => updateQuantity(product.product_id, 1)}
                        decrementQuantity={() => updateQuantity(product.product_id, -1)}
                      />
                    // )
                    ))}
                  </div>
                </div>
              </div>
            </section>
          // )
        ))}

      {/* <div className="container mx-auto" dangerouslySetInnerHTML={{__html: data?.content}} /> */}
    </div>
  )
}

export default ProductList