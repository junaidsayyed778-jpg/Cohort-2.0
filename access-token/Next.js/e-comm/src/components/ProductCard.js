import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProductCard = ({ product }) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/products/${product.id}`}>
        <div className="relative flex h-64 items-center justify-center bg-muted p-6">
          <img
            src={product.image}
            alt={product.title}
            width={220}
            height={220}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <CardContent className="space-y-4 p-5">
        <Badge variant="secondary" className="capitalize">
          {product.category}
        </Badge>

        <Link href={`/products/${product.id}`}>
          <h2 className="line-clamp-2 cursor-pointer text-lg font-semibold hover:text-primary transition-colors">
            {product.title}
          </h2>
        </Link>

        <p className="line-clamp-3 text-sm text-muted-foreground">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>

          <div className="flex items-center gap-1 text-sm">
            <span>⭐</span>
            <span className="font-medium">{product.rating.rate}</span>
            <span className="text-muted-foreground">
              ({product.rating.count})
            </span>
          </div>
        </div>

        <Button className="w-full cursor-pointer">
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;